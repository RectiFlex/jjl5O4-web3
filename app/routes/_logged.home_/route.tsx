import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { useNavigate } from '@remix-run/react'
import { Card, Col, Progress, Row, Select, Space, Tag, Typography } from 'antd'
import { useState } from 'react'
const { Title, Text } = Typography

export default function HomePage() {
  const navigate = useNavigate()
  const [categoryFilter, setCategoryFilter] = useState<string>('')
  const [blockchainFilter, setBlockchainFilter] = useState<string>('')
  const [statusFilter, setStatusFilter] = useState<string>('')

  // Fetch all projects with their token sales
  const { data: projects, isLoading } = Api.project.findMany.useQuery({
    include: {
      tokenSales: true,
    },
  })

  // Extract unique categories and blockchains for filters
  const categories = [
    ...new Set(projects?.map(p => p.category).filter(Boolean)),
  ]
  const blockchains = [
    ...new Set(projects?.map(p => p.blockchain).filter(Boolean)),
  ]
  const statuses = [...new Set(projects?.map(p => p.status).filter(Boolean))]

  // Filter projects based on selected filters
  const filteredProjects = projects?.filter(project => {
    const matchCategory = !categoryFilter || project.category === categoryFilter
    const matchBlockchain =
      !blockchainFilter || project.blockchain === blockchainFilter
    const matchStatus = !statusFilter || project.status === statusFilter
    return matchCategory && matchBlockchain && matchStatus
  })

  const calculateProgress = (current: string, goal: string) => {
    const currentNum = parseFloat(current || '0')
    const goalNum = parseFloat(goal || '1')
    return Math.min((currentNum / goalNum) * 100, 100)
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
        <Title level={2}>
          <i className="las la-rocket" /> Web3 Project Launches
        </Title>
        <Text type="secondary">
          Discover and track the most exciting upcoming Web3 project launches
        </Text>

        <div style={{ margin: '24px 0' }}>
          <Space size="large">
            <Select
              style={{ width: 200 }}
              placeholder="Filter by Category"
              allowClear
              onChange={setCategoryFilter}
            >
              {categories?.map(category => (
                <Select.Option key={category} value={category}>
                  {category}
                </Select.Option>
              ))}
            </Select>

            <Select
              style={{ width: 200 }}
              placeholder="Filter by Blockchain"
              allowClear
              onChange={setBlockchainFilter}
            >
              {blockchains?.map(blockchain => (
                <Select.Option key={blockchain} value={blockchain}>
                  {blockchain}
                </Select.Option>
              ))}
            </Select>

            <Select
              style={{ width: 200 }}
              placeholder="Filter by Status"
              allowClear
              onChange={setStatusFilter}
            >
              {statuses?.map(status => (
                <Select.Option key={status} value={status}>
                  {status}
                </Select.Option>
              ))}
            </Select>
          </Space>
        </div>

        <Row gutter={[24, 24]}>
          {filteredProjects?.map(project => (
            <Col xs={24} sm={12} lg={8} key={project.id}>
              <Card
                hoverable
                onClick={() => navigate(`/projects/${project.id}`)}
                title={
                  <Space>
                    <i className="las la-cube" />
                    {project.name}
                  </Space>
                }
                extra={
                  <Tag color={project.status === 'ACTIVE' ? 'green' : 'blue'}>
                    {project.status}
                  </Tag>
                }
              >
                <Text type="secondary">{project.description}</Text>
                <div style={{ marginTop: '16px' }}>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    {project.blockchain && (
                      <Text>
                        <i className="las la-link" /> Chain:{' '}
                        {project.blockchain}
                      </Text>
                    )}
                    {project.tokenPrice && (
                      <Text>
                        <i className="las la-tag" /> Token Price:{' '}
                        {project.tokenPrice}
                      </Text>
                    )}
                    {project.launchDate && (
                      <Text>
                        <i className="las la-calendar" /> Launch:{' '}
                        {project.launchDate}
                      </Text>
                    )}
                    {project.fundingGoal && (
                      <div>
                        <Text>Funding Progress</Text>
                        <Progress
                          percent={calculateProgress(
                            project.currentFunding || '0',
                            project.fundingGoal,
                          )}
                          status="active"
                        />
                      </div>
                    )}
                  </Space>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        {isLoading && <Text>Loading projects...</Text>}
        {!isLoading && filteredProjects?.length === 0 && (
          <Text>No projects found matching the selected filters.</Text>
        )}
      </div>
    </PageLayout>
  )
}
