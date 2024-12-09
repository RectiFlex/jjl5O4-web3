import {
  Typography,
  Card,
  Button,
  Table,
  Select,
  Space,
  Spin,
  message,
} from 'antd'
import { useState } from 'react'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function WalletPage() {
  const { user } = useUserContext()
  const [selectedNetwork, setSelectedNetwork] = useState('ethereum')

  // Fetch wallet data
  const { data: wallets, isLoading: walletsLoading } =
    Api.wallet.findMany.useQuery({
      where: { userId: user?.id },
      orderBy: { createdAt: 'desc' },
    })

  // Fetch transactions
  const { data: transactions, isLoading: transactionsLoading } =
    Api.transaction.findMany.useQuery({
      where: { userId: user?.id },
      orderBy: { createdAt: 'desc' },
    })

  // Connect wallet mutation
  const { mutateAsync: connectWallet } = Api.wallet.create.useMutation()

  // Disconnect wallet mutation
  const { mutateAsync: disconnectWallet } = Api.wallet.delete.useMutation()

  const networks = [
    { label: 'Ethereum', value: 'ethereum' },
    { label: 'Binance Smart Chain', value: 'bsc' },
    { label: 'Polygon', value: 'polygon' },
  ]

  const handleNetworkChange = (value: string) => {
    setSelectedNetwork(value)
  }

  const handleConnectWallet = async () => {
    try {
      // Simulating wallet connection
      const mockAddress = `0x${Math.random().toString(16).slice(2, 42)}`
      await connectWallet({
        data: {
          userId: user?.id || '',
          address: mockAddress,
          network: selectedNetwork,
          balance: '0.0',
        },
      })
      message.success('Wallet connected successfully')
    } catch (error) {
      message.error('Failed to connect wallet')
    }
  }

  const handleDisconnectWallet = async (walletId: string) => {
    try {
      await disconnectWallet({ where: { id: walletId } })
      message.success('Wallet disconnected successfully')
    } catch (error) {
      message.error('Failed to disconnect wallet')
    }
  }

  const walletColumns = [
    {
      title: 'Network',
      dataIndex: 'network',
      key: 'network',
      render: (text: string) => (
        <Text>
          <i className="las la-network-wired"></i> {text}
        </Text>
      ),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      render: (text: string) => (
        <Text>
          <i className="las la-wallet"></i> {text}
        </Text>
      ),
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
      render: (text: string) => (
        <Text>
          <i className="las la-coins"></i> {text}
        </Text>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Button
          danger
          onClick={() => handleDisconnectWallet(record.id)}
          icon={<i className="las la-unlink"></i>}
        >
          Disconnect
        </Button>
      ),
    },
  ]

  const transactionColumns = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (text: string) => (
        <Text>
          <i
            className={`las ${
              text === 'deposit' ? 'la-arrow-down' : 'la-arrow-up'
            }`}
          ></i>{' '}
          {text}
        </Text>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (text: string) => (
        <Text>
          <i className="las la-coins"></i> {text}
        </Text>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text: string) => (
        <Text>
          <i
            className={`las ${
              text === 'completed' ? 'la-check-circle' : 'la-clock'
            }`}
          ></i>{' '}
          {text}
        </Text>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: Date) => (
        <Text>{dayjs(date).format('YYYY-MM-DD HH:mm')}</Text>
      ),
    },
  ]

  if (walletsLoading || transactionsLoading) {
    return (
      <PageLayout layout="full-width">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" />
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}>
        <Title level={2}>
          <i className="las la-wallet"></i> Wallet Management
        </Title>
        <Text type="secondary">
          Manage your crypto wallets and view your transaction history
        </Text>

        <Card title="Connect Wallet" style={{ marginTop: 24 }}>
          <Space>
            <Select
              defaultValue={selectedNetwork}
              onChange={handleNetworkChange}
              options={networks}
              style={{ width: 200 }}
            />
            <Button
              type="primary"
              onClick={handleConnectWallet}
              icon={<i className="las la-link"></i>}
            >
              Connect Wallet
            </Button>
          </Space>
        </Card>

        <Card title="My Wallets" style={{ marginTop: 24 }}>
          <Table
            dataSource={wallets}
            columns={walletColumns}
            rowKey="id"
            pagination={false}
          />
        </Card>

        <Card title="Transaction History" style={{ marginTop: 24 }}>
          <Table
            dataSource={transactions}
            columns={transactionColumns}
            rowKey="id"
            pagination={{ pageSize: 5 }}
          />
        </Card>
      </div>
    </PageLayout>
  )
}
