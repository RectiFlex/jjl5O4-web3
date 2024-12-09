import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { useNavigate, useParams } from '@remix-run/react'
import {
  Button,
  Card,
  Col,
  Form,
  Progress,
  Row,
  Select,
  Space,
  Typography,
  message,
  LoadingOutlined,
} from 'antd'
import { useState } from 'react'
const { Title, Text } = Typography

export default function ProjectBuildPage() {
  const { id: projectId } = useParams()
  const navigate = useNavigate()
  const [buildProgress, setBuildProgress] = useState(0)
  const [isBuilding, setIsBuilding] = useState(false)
  const [form] = Form.useForm()

  const { data: project, isLoading } = Api.project.findUnique.useQuery({
    where: { id: projectId },
  })

  const { mutateAsync: updateProject } = Api.project.update.useMutation()

  const getBuildOptions = (category: string) => {
    switch (category) {
      case 'DeFi':
        return ['DEX', 'Lending', 'Yield Farming']
      case 'NFT':
        return ['Marketplace', 'Collection', 'Gaming']
      case 'GameFi':
        return ['P2E', 'Metaverse', 'Trading Cards']
      default:
        return ['Standard', 'Custom']
    }
  }

  const handleBuildSubmit = async (values: any) => {
    try {
      setIsBuilding(true)

      // Simulate build progress
      const interval = setInterval(() => {
        setBuildProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 10
        })
      }, 1000)

      await updateProject({
        where: { id: projectId },
        data: {
          buildStatus: 'IN_PROGRESS',
          ...values,
        },
      })

      message.success('Build process started successfully')
    } catch (error) {
      message.error('Failed to start build process')
      setIsBuilding(false)
    }
  }

  if (isLoading) {
    return <PageLayout layout="full-width" isLoading><LoadingOutlined spin /></PageLayout>
  }

  if (!project) {
    return <PageLayout layout="full-width">Project not found</PageLayout>
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Title level={2}>
          <i className="las la-tools" /> Build Configuration
        </Title>
        <Text>Configure and start the build process for {project.name}</Text>

        <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
          <Col xs={24} lg={16}>
            <Card title="Build Configuration">
              <Form
                form={form}
                layout="vertical"
                onFinish={handleBuildSubmit}
                disabled={isBuilding}
              >
                <Form.Item
                  name="buildType"
                  label="Build Type"
                  rules={[{ required: true }]}
                >
                  <Select
                    placeholder="Select build type"
                    options={getBuildOptions(project.category || '').map(
                      opt => ({
                        label: opt,
                        value: opt,
                      }),
                    )}
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isBuilding}
                    icon={<i className="las la-rocket" />}
                  >
                    Start Build Process
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card title="Build Status">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Text>
                  Current Status:{' '}
                  <Text strong>{project.buildStatus || 'Not Started'}</Text>
                </Text>

                {isBuilding && (
                  <>
                    <Text>Build Progress</Text>
                    <Progress percent={buildProgress} status="active" />
                  </>
                )}
              </Space>
            </Card>
          </Col>
        </Row>
      </div>
    </PageLayout>
  )
}
