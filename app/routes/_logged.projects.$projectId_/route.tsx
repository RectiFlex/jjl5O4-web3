import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { useNavigate, useParams } from '@remix-run/react'
import {
  Avatar,
  Button,
  Card,
  Col,
  Descriptions,
  Progress,
  Row,
  Statistic,
  Typography,
  message,
} from 'antd'
import dayjs from 'dayjs'
const { Title, Text, Paragraph } = Typography

export default function ProjectDetailsPage() {
  const { projectId } = useParams()
  const navigate = useNavigate()
  const { user, isLoggedIn } = useUserContext()

  // Fetch project data with related information
  const { data: project, isLoading } = Api.project.findFirst.useQuery({
    where: { id: projectId },
    include: {
      teamMembers: true,
      tokenSales: true,
      investments: true,
    },
  })

  // Fetch user's investment if logged in
  const { data: userInvestment } = Api.investment.findFirst.useQuery(
    {
      where: {
        userId: user?.id,
        projectId: projectId,
      },
    },
    { enabled: !!user?.id },
  )

  const { mutateAsync: createInvestment } = Api.investment.create.useMutation()

  const handleInvestment = async () => {
    if (!isLoggedIn) {
      message.error('Please connect your wallet first')
      return
    }

    try {
      await createInvestment({
        data: {
          userId: user.id,
          projectId: projectId!,
          amount: '0',
          status: 'PENDING',
          claimStatus: 'NOT_CLAIMED',
        },
      })
      message.success('Investment initiated successfully')
    } catch (error) {
      message.error('Failed to initiate investment')
    }
  }

  if (isLoading) {
    return <PageLayout layout="full-width">Loading...</PageLayout>
  }

  if (!project) {
    return <PageLayout layout="full-width">Project not found</PageLayout>
  }

  const tokenSale = project.tokenSales[0]
  const progress =
    project.currentFunding && project.fundingGoal
      ? (parseFloat(project.currentFunding) / parseFloat(project.fundingGoal)) *
        100
      : 0

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Title level={2}>
          <i className="las la-project-diagram" style={{ marginRight: 8 }}></i>
          {project.name}
        </Title>
        <Paragraph>{project.description}</Paragraph>

        <Row gutter={[24, 24]}>
          <Col xs={24} lg={16}>
            <Card
              title={
                <>
                  <i className="las la-info-circle"></i> Project Details
                </>
              }
            >
              <Descriptions column={{ xs: 1, sm: 2 }}>
                <Descriptions.Item label="Category">
                  {project.category}
                </Descriptions.Item>
                <Descriptions.Item label="Blockchain">
                  {project.blockchain}
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                  {project.buildStatus}
                </Descriptions.Item>
                <Descriptions.Item label="Launch Date">
                  {project.launchDate
                    ? dayjs(project.launchDate).format('MMMM D, YYYY')
                    : 'TBA'}
                </Descriptions.Item>
              </Descriptions>

              {project.whitepaperUrl && (
                <Button
                  type="primary"
                  href={project.whitepaperUrl}
                  target="_blank"
                  style={{ marginTop: 16 }}
                >
                  <i className="las la-file-pdf"></i> View Whitepaper
                </Button>
              )}
            </Card>

            <Card
              title={
                <>
                  <i className="las la-users"></i> Team Members
                </>
              }
              style={{ marginTop: 24 }}
            >
              <Row gutter={[16, 16]}>
                {project.teamMembers?.map(member => (
                  <Col xs={24} sm={12} md={8} key={member.id}>
                    <Card>
                      <Card.Meta
                        avatar={
                          <Avatar
                            src={
                              member.pictureUrl ||
                              'https://i.imgur.com/ZdJSK3Y.jpeg'
                            }
                            size={64}
                          />
                        }
                        title={member.name}
                        description={
                          <>
                            <Text strong>{member.role}</Text>
                            <Paragraph ellipsis={{ rows: 2 }}>
                              {member.bio}
                            </Paragraph>
                          </>
                        }
                      />
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card
              title={
                <>
                  <i className="las la-chart-pie"></i> Token Sale
                </>
              }
            >
              <Statistic
                title="Token Price"
                value={project.tokenPrice}
                prefix="$"
              />
              <Progress percent={progress} status="active" />
              <Row gutter={16} style={{ marginTop: 16 }}>
                <Col span={12}>
                  <Statistic
                    title="Current Funding"
                    value={project.currentFunding}
                    prefix="$"
                  />
                </Col>
                <Col span={12}>
                  <Statistic
                    title="Funding Goal"
                    value={project.fundingGoal}
                    prefix="$"
                  />
                </Col>
              </Row>

              {tokenSale && (
                <div style={{ marginTop: 24 }}>
                  <Text strong>Sale Period:</Text>
                  <br />
                  {tokenSale.saleStartDate} - {tokenSale.saleEndDate}
                  <br />
                  <Text strong>Allocation:</Text>
                  <br />
                  Min: {tokenSale.minAllocation} | Max:{' '}
                  {tokenSale.maxAllocation}
                </div>
              )}

              {userInvestment ? (
                <Card style={{ marginTop: 16 }} type="inner">
                  <Statistic
                    title="Your Investment"
                    value={userInvestment.amount}
                    prefix="$"
                    suffix={
                      <Text type="secondary">({userInvestment.status})</Text>
                    }
                  />
                </Card>
              ) : (
                <Button
                  type="primary"
                  block
                  size="large"
                  onClick={handleInvestment}
                  style={{ marginTop: 16 }}
                >
                  <i className="las la-wallet"></i> Participate in Token Sale
                </Button>
              )}
            </Card>
          </Col>
        </Row>
      </div>
    </PageLayout>
  )
}
