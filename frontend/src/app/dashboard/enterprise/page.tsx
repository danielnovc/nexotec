"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Users, 
  BarChart3, 
  CreditCard, 
  Plus, 
  UserPlus,
  Activity,
  Clock,
  DollarSign,
  TrendingUp,
  Calendar,
  Filter
} from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'
import { AddUserModal } from "@/components/add-user-modal"
import { 
  getEnterpriseUsers, 
  getEnterpriseStats, 
  getEnterpriseUsageData, 
  getServiceBreakdown,
  hasEnterpriseAccess 
} from "@/lib/enterprise-api"
import { DashboardUser, DashboardUsageData, ServiceBreakdown } from "@/lib/enterprise-types"
import { toast } from "sonner"

export default function EnterpriseDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showAddUserModal, setShowAddUserModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [hasEnterprise, setHasEnterprise] = useState(false)
  const [accessDenied, setAccessDenied] = useState(false)
  
  // Data states
  const [users, setUsers] = useState<DashboardUser[]>([])
  const [stats, setStats] = useState({
    total_users: 0,
    active_users: 0,
    total_minutes: 0,
    total_cost: 0,
    usage_trend: 0
  })
  const [usageData, setUsageData] = useState<DashboardUsageData[]>([])
  const [serviceBreakdown, setServiceBreakdown] = useState<ServiceBreakdown[]>([])

  // Load data on component mount
  useEffect(() => {
    checkEnterpriseAccess()
  }, [])

  const loadDashboardData = async () => {
    setLoading(true)
    try {
      const [usersData, statsData, usageData, breakdownData] = await Promise.all([
        getEnterpriseUsers(),
        getEnterpriseStats(),
        getEnterpriseUsageData(7),
        getServiceBreakdown()
      ])

      setUsers(usersData)
      setStats(statsData)
      setUsageData(usageData)
      setServiceBreakdown(breakdownData)
    } catch (error) {
      console.error("Error loading dashboard data:", error)
      toast.error("Failed to load dashboard data")
    } finally {
      setLoading(false)
    }
  }

  const checkEnterpriseAccess = async () => {
    try {
      const enterpriseStatus = await hasEnterpriseAccess()
      setHasEnterprise(enterpriseStatus)
      
      if (enterpriseStatus) {
        // Load dashboard data only if user has enterprise access
        await loadDashboardData()
      } else {
        // Show access denied
        setAccessDenied(true)
        setLoading(false)
        toast.error("Access denied. Enterprise access required.")
      }
    } catch (error) {
      console.error("Error checking enterprise access:", error)
      setAccessDenied(true)
      setLoading(false)
      toast.error("Error checking permissions")
    }
  }

  const handleUserCreated = () => {
    loadDashboardData() // Refresh the data
  }

  // Show access denied message
  if (accessDenied) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
          <p className="text-muted-foreground">
            You don't have permission to access the Enterprise Dashboard.
          </p>
          <Button onClick={() => window.location.href = '/dashboard'}>
            Return to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Enterprise Dashboard</h1>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
              </CardHeader>
              <CardContent>
                <div className="h-8 w-16 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Enterprise Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your team's transcription usage and billing
          </p>
        </div>
        {/* Add User Button */}
        {hasEnterprise && (
          <Button onClick={() => setShowAddUserModal(true)} className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Add User
          </Button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total_users}</div>
            <p className="text-xs text-muted-foreground">
              {stats.active_users} active users
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Minutes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total_minutes.toFixed(0)}</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.total_cost.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usage Trend</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.usage_trend > 0 ? '+' : ''}{stats.usage_trend.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              vs last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="finances" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Finances & Usage
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Usage Graph */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Usage Overview</CardTitle>
              <CardDescription>
                Transcription minutes and costs over the last 7 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={usageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Line yAxisId="left" type="monotone" dataKey="minutes" stroke="#3B82F6" strokeWidth={2} />
                    <Line yAxisId="right" type="monotone" dataKey="cost" stroke="#10B981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* User Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {users.map((user) => (
              <Card key={user.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{user.name}</CardTitle>
                        <CardDescription>{user.email}</CardDescription>
                      </div>
                    </div>
                    <Badge variant={user.status === "active" ? "default" : "secondary"}>
                      {user.role}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Transcription Minutes:</span>
                    <span className="font-medium">{user.transcriptionMinutes.toFixed(0)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Last Active:</span>
                    <span className="font-medium">{new Date(user.lastActive).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge variant={user.status === "active" ? "default" : "outline"} className="text-xs">
                      {user.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Finances Tab */}
        <TabsContent value="finances" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Usage Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Usage Trends</CardTitle>
                <CardDescription>Monthly transcription minutes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={usageData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="minutes" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Service Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Service Breakdown</CardTitle>
                <CardDescription>Usage by service type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={serviceBreakdown}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {serviceBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cost Details */}
          <Card>
            <CardHeader>
              <CardTitle>Cost Breakdown</CardTitle>
              <CardDescription>Detailed cost analysis by service</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {serviceBreakdown.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: service.color }}
                      />
                      <span className="font-medium">{service.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">${((stats.total_cost * service.value) / 100).toFixed(2)}</div>
                      <div className="text-sm text-muted-foreground">{service.value.toFixed(1)}% of total</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add User Modal */}
      <AddUserModal 
        open={showAddUserModal} 
        onClose={() => setShowAddUserModal(false)}
        onUserCreated={handleUserCreated}
      />
    </div>
  )
} 