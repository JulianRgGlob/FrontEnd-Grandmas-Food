// mock data for admins api because we don't have a real api in this project
const AdminsApi = () => {
  const mockAdmins = [
    {
      id: '550e8400-e29b-41d4-a716-446655440101',
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      password: 'password',
      role: 'admin',
      created_at: new Date().toISOString(),
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440102',
      name: 'Bob Smith',
      email: 'bob.smith@example.com',
      password: 'password2',
      role: 'admin',
      created_at: new Date().toISOString(),
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440103',
      name: 'Catherine Taylor',
      email: 'catherine.taylor@example.com',
      password: 'password3',
      role: 'admin',
      created_at: new Date().toISOString(),
    },
  ]

  const getAdmins = () => {
    return mockAdmins
  }

  return { getAdmins }
}

export default AdminsApi
