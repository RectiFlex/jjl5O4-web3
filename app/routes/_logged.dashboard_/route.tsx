import {
  Typography,
  Card,
  Table,
  Button,
  Row,
  Col,
  Statistic,
  Tag,
  message,
} from 'antd'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function DashboardPage() {
  const { user } = useUserContext()
  const navigate = useNavigate()

  // Fetch user's investments with project details
  const {
    data: investments,
    isLoading: isLoadingInvestments,
    refetch,
  } = Api.investment.findMany.useQuery({
    where: { userId: user?.id },
    include: { project: true },
  })

  // Fetch user's transactions
  const { data: transactions, isLoading: isLoadingTransactions } =
    Api.transaction.findMany.useQuery({
      where: { userId: user?.id },
    })

  // Mutation for claiming tokens
  const { mutateAsync: updateInvestment } = Api.investment.update.useMutation()

  const handleClaimTokens = async (investmentId: string) => {
    try {
      await updateInvestment({
        where: { id: investmentId },
        data: { claimStatus: 'CLAIMED' },
      })
      message.success('Tokens claimed successfully!')
      refetch()
    } catch (error) {
      message.error('Failed to claim tokens')
    }
  }

  const investmentColumns = [
    {
      title: 'Project',
      dataIndex: ['project', 'name'],
      key: 'projectName',
      render: (text: string, record: any) => (
        <Button
          type="link"
          onClick={() => navigate(`/projects/${record.project.id}`)}
        >
          {text}
        </Button>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: string) => (
        <Text>
          <i className="las la-coins" /> {amount}
        </Text>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'ACTIVE' ? 'green' : 'orange'}>{status}</Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) =>
        record.claimStatus !== 'CLAIMED' && record.status === 'ACTIVE' ? (
          <Button
            type="primary"
            onClick={() => handleClaimTokens(record.id)}
            icon={<i className="las la-hand-holding-usd" />}
          >
            Claim Tokens
          </Button>
        ) : (
          <Tag color="default">Claimed</Tag>
        ),
    },
  ]

  const transactionColumns = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Text>
          <i
            className={`las ${
              type === 'DEPOSIT' ? 'la-arrow-down' : 'la-arrow-up'
            }`}
          />{' '}
          {type}
        </Text>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'COMPLETED' ? 'green' : 'orange'}>{status}</Tag>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD HH:mm'),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Title level={2}>
          <i className="las la-chart-line" /> Investment Dashboard
        </Title>
        <Text type="secondary">
          Track your investments and manage your portfolio
        </Text>

        <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
          <Col xs={24} sm={12} lg={8}>
            <Card>
              <Statistic
                title="Total Investments"
                value={investments?.length || 0}
                prefix={<i className="las la-project-diagram" />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <Card>
              <Statistic
                title="Active Projects"
                value={
                  investments?.filter(i => i.status === 'ACTIVE').length || 0
                }
                prefix={<i className="las la-rocket" />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={8}>
            <Card>
              <Statistic
                title="Total Transactions"
                value={transactions?.length || 0}
                prefix={<i className="las la-exchange-alt" />}
              />
            </Card>
          </Col>
        </Row>

        <Card
          title={
            <>
              <i className="las la-chart-bar" /> Active Investments
            </>
          }
          style={{ marginTop: 24 }}
        >
          <Table
            dataSource={investments}
            columns={investmentColumns}
            loading={isLoadingInvestments}
            rowKey="id"
          />
        </Card>

        <Card
          title={
            <>
              <i className="las la-history" /> Transaction History
            </>
          }
          style={{ marginTop: 24 }}
        >
          <Table
            dataSource={transactions}
            columns={transactionColumns}
            loading={isLoadingTransactions}
            rowKey="id"
          />
        </Card>
      </div>
    </PageLayout>
  )
}
