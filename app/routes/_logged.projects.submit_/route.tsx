import { Typography, Form, Input, Button, InputNumber, message } from 'antd'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { useNavigate } from '@remix-run/react'
import { useUserContext } from '@/core/context'

export default function SubmitProjectPage() {
  const navigate = useNavigate()
  const { user } = useUserContext()
  const [form] = Form.useForm()

  const createProject = Api.project.create.useMutation()

  const handleSubmit = async (values: any) => {
    try {
      const project = await createProject.mutateAsync({
        data: {
          name: values.name,
          description: values.description,
          category: values.category,
          blockchain: values.blockchain,
          tokenPrice: values.tokenPrice?.toString(),
          launchDate: values.launchDate,
          fundingGoal: values.fundingGoal?.toString(),
          whitepaperUrl: values.whitepaperUrl,
          userId: user?.id || '',
          status: 'PENDING_REVIEW',
        },
      })

      message.success('Project submitted successfully!')
      navigate(`/projects/${project.id}`)
    } catch (error) {
      message.error('Failed to submit project')
    }
  }

  return (
    <PageLayout layout="narrow">
      <Typography.Title level={2}>Submit Project</Typography.Title>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item name="name" label="Project Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="description" label="Description" rules={[{ required: true }]}>
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item name="category" label="Category" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="blockchain" label="Blockchain" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="tokenPrice" label="Token Price" rules={[{ required: true }]}>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="launchDate" label="Launch Date" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="fundingGoal" label="Funding Goal" rules={[{ required: true }]}>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="whitepaperUrl" label="Whitepaper URL">
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit Project
          </Button>
        </Form.Item>
      </Form>
    </PageLayout>
  )
}
