import {
  Typography,
  Form,
  Input,
  Button,
  Upload,
  DatePicker,
  InputNumber,
  Space,
  Card,
  Row,
  Col,
  message,
  Alert,
} from 'antd'
import { useState } from 'react'
const { Title, Text, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function CreateProjectPage() {
  const navigate = useNavigate()
  const { user } = useUserContext()
  const [form] = Form.useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [teamMembers, setTeamMembers] = useState<
    { name: string; role: string; bio: string }[]
  >([])
  const { mutateAsync: upload } = useUploadPublic()

  const createProject = Api.project.create.useMutation()
  const createTeamMember = Api.teamMember.create.useMutation()
  const createTokenSale = Api.tokenSale.create.useMutation()

  const handleSubmit = async (values: any) => {
    setIsSubmitting(true)
    try {
      let whitepaperUrl
      if (values.whitepaper?.[0]) {
        const result = await upload({
          file: values.whitepaper[0].originFileObj,
        })
        whitepaperUrl = result.url
      }

      const project = await createProject.mutateAsync({
        data: {
          name: values.name,
          description: values.description,
          category: values.category,
          blockchain: values.blockchain,
          tokenPrice: values.tokenPrice?.toString(),
          launchDate: values.launchDate,
          fundingGoal: values.fundingGoal?.toString(),
          whitepaperUrl,
          userId: user?.id || '',
          status: 'PENDING_REVIEW',
        },
      })

      for (const member of teamMembers) {
        await createTeamMember.mutateAsync({
          data: {
            name: member.name,
            role: member.role,
            bio: member.bio,
            projectId: project.id,
          },
        })
      }

      await createTokenSale.mutateAsync({
        data: {
          totalSupply: values.totalSupply?.toString(),
          distributionDetails: values.distributionDetails,
          saleStartDate: values.saleStartDate,
          saleEndDate: values.saleEndDate,
          minAllocation: values.minAllocation?.toString(),
          maxAllocation: values.maxAllocation?.toString(),
          projectId: project.id,
        },
      })

      message.success('Project submitted successfully! It will be reviewed by our team.')
      navigate(`/projects/${project.id}`)
    } catch (error) {
      message.error('Failed to submit project')
    } finally {
      setIsSubmitting(false)
    }
  }

  const addTeamMember = () => {
    form
      .validateFields(['memberName', 'memberRole', 'memberBio'])
      .then(values => {
        setTeamMembers([
          ...teamMembers,
          {
            name: values.memberName,
            role: values.memberRole,
            bio: values.memberBio,
          },
        ])
        form.setFieldsValue({ memberName: '', memberRole: '', memberBio: '' })
      })
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Title level={2}>
          <i className="las la-rocket" /> Submit Your Web3 Project
        </Title>
        <Text>
          Fill in the details below to submit your project for listing.
        </Text>
        <Alert
          message="Your project will be reviewed by our team before being listed"
          type="info"
          showIcon
          style={{ marginTop: 16 }}
        />

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          style={{ marginTop: 24 }}
        >
          <Row gutter={24}>
            <Col span={24}>
              <Card
                title={
                  <>
                    <i className="las la-info-circle" /> Basic Information
                  </>
                }
              >
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="name"
                      label="Project Name"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="category"
                      label="Category"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  name="description"
                  label="Description"
                  rules={[{ required: true }]}
                >
                  <Input.TextArea rows={4} />
                </Form.Item>
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="blockchain"
                      label="Blockchain"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item name="whitepaper" label="Whitepaper">
                      <Upload maxCount={1} beforeUpload={() => false}>
                        <Button icon={<i className="las la-file-upload" />}>
                          Upload
                        </Button>
                      </Upload>
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col span={24} style={{ marginTop: 24 }}>
              <Card
                title={
                  <>
                    <i className="las la-coins" /> Token Sale Details
                  </>
                }
              >
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="tokenPrice"
                      label="Token Price"
                      rules={[{ required: true }]}
                    >
                      <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="totalSupply"
                      label="Total Supply"
                      rules={[{ required: true }]}
                    >
                      <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item name="minAllocation" label="Minimum Allocation">
                      <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item name="maxAllocation" label="Maximum Allocation">
                      <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  name="distributionDetails"
                  label="Distribution Details"
                >
                  <Input.TextArea rows={4} />
                </Form.Item>
              </Card>
            </Col>

            <Col span={24} style={{ marginTop: 24 }}>
              <Card
                title={
                  <>
                    <i className="las la-users" /> Team Members
                  </>
                }
              >
                <Space direction="vertical" style={{ width: '100%' }}>
                  {teamMembers?.map((member, index) => (
                    <Card key={index} size="small">
                      <Text strong>{member.name}</Text> - {member.role}
                      <Paragraph>{member.bio}</Paragraph>
                    </Card>
                  ))}
                </Space>

                <Row gutter={16} style={{ marginTop: 16 }}>
                  <Col xs={24} md={8}>
                    <Form.Item name="memberName" label="Name">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item name="memberRole" label="Role">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item name="memberBio" label="Bio">
                      <Input.TextArea rows={1} />
                    </Form.Item>
                  </Col>
                </Row>
                <Button
                  onClick={addTeamMember}
                  icon={<i className="las la-plus" />}
                >
                  Add Team Member
                </Button>
              </Card>
            </Col>
          </Row>

          <Form.Item style={{ marginTop: 24 }}>
            <Button
              type="primary"
              htmlType="submit"
              icon={<i className="las la-save" />}
              loading={isSubmitting}
            >
              Submit Project
            </Button>
          </Form.Item>
        </Form>
      </div>
    </PageLayout>
  )
}
