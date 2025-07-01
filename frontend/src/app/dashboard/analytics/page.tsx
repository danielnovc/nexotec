"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  CreditCard, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  BarChart3,
  Plus,
  Activity,
  Calendar,
  Download,
  Upload
} from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'
import { useCredits } from "@/hooks/useCredits"
import { useAuth } from "@/contexts/AuthContext"
import { toast } from "sonner"
import { 
  getUserDailyUsage, 
  getUserServiceBreakdown, 
  getUserMonthlyUsage, 
  getUserAnalyticsStats, 
  getUserRecentActivity,
  type DailyUsageData,
  type ServiceBreakdownData,
  type MonthlyUsageData,
  type AnalyticsStats,
  type RecentActivity
} from "@/lib/analytics-api"
import { CreditTopUpModal } from "@/components/credit-topup-modal"

export default function AnalyticsPage() {
  const { user } = useAuth()
  const { credits, loading: creditsLoading, refreshCredits } = useCredits()
  
  const [activeTab, setActiveTab] = useState("overview")
  const [loading, setLoading] = useState(false)
  const [dataLoading, setDataLoading] = useState(true)
  
  // Real data state
  const [dailyUsage, setDailyUsage] = useState<DailyUsageData[]>([])
  const [serviceBreakdown, setServiceBreakdown] = useState<ServiceBreakdownData[]>([])
  const [monthlyUsage, setMonthlyUsage] = useState<MonthlyUsageData[]>([])
  const [analyticsStats, setAnalyticsStats] = useState<AnalyticsStats>({
    currentBalance: 0,
    totalMinutes: 0,
    totalCost: 0,
    usageTrend: 0,
    averageDailyUsage: 0,
    peakUsageDay: 'Monday',
    mostUsedService: 'Transcription'
  })
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])

  // Load analytics data
  useEffect(() => {
    if (user?.id) {
      loadAnalyticsData()
    }
  }, [user?.id])

  const loadAnalyticsData = async () => {
    if (!user?.id) return
    
    setDataLoading(true)
    try {
      const [
        dailyData,
        serviceData,
        monthlyData,
        statsData,
        activityData
      ] = await Promise.all([
        getUserDailyUsage(user.id),
        getUserServiceBreakdown(user.id),
        getUserMonthlyUsage(user.id),
        getUserAnalyticsStats(user.id),
        getUserRecentActivity(user.id)
      ])

      setDailyUsage(dailyData)
      setServiceBreakdown(serviceData)
      setMonthlyUsage(monthlyData)
      setAnalyticsStats(statsData)
      setRecentActivity(activityData)
    } catch (error) {
      console.error('Error loading analytics data:', error)
      toast.error('Failed to load analytics data')
    } finally {
      setDataLoading(false)
    }
  }



  if (dataLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
            <p className="text-muted-foreground">
              Track your usage, costs, and manage your credits
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading analytics data...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Track your usage, costs, and manage your credits
          </p>
        </div>
        <CreditTopUpModal>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Top Up Credits
          </Button>
        </CreditTopUpModal>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {creditsLoading ? '...' : `$${analyticsStats.currentBalance.toFixed(2)}`}
            </div>
            <p className="text-xs text-muted-foreground">
              Available credits
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Minutes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsStats.totalMinutes}</div>
            <p className="text-xs text-muted-foreground">
              This week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${analyticsStats.totalCost.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              This week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usage Trend</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{analyticsStats.usageTrend}%</div>
            <p className="text-xs text-muted-foreground">
              vs last week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="usage" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Usage Details
          </TabsTrigger>
          <TabsTrigger value="services" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Services
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Daily Usage Graph */}
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
                  <LineChart data={dailyUsage}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Line yAxisId="left" type="monotone" dataKey="minutes" stroke="#3B82F6" strokeWidth={2} name="Minutes" />
                    <Line yAxisId="right" type="monotone" dataKey="cost" stroke="#10B981" strokeWidth={2} name="Cost ($)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Service Breakdown */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Service Breakdown</CardTitle>
                <CardDescription>Usage by service type</CardDescription>
              </CardHeader>
              <CardContent>
                {serviceBreakdown.length > 0 ? (
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
                ) : (
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    No usage data available
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest transcription sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.length > 0 ? (
                    recentActivity.slice(0, 3).map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full" />
                          <div>
                            <p className="font-medium">{activity.date}</p>
                            <p className="text-sm text-muted-foreground">{activity.minutes} minutes</p>
                          </div>
                        </div>
                        <Badge variant="outline">${activity.cost.toFixed(2)}</Badge>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No recent activity
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Usage Details Tab */}
        <TabsContent value="usage" className="space-y-6">
          {/* Monthly Usage Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Usage Trends</CardTitle>
              <CardDescription>Your usage patterns over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                {monthlyUsage.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyUsage}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="minutes" fill="#3B82F6" name="Minutes" />
                      <Bar dataKey="cost" fill="#10B981" name="Cost ($)" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-muted-foreground">
                    No monthly data available
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Usage Statistics */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Usage Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Average Daily Usage</span>
                    <span className="font-semibold">{analyticsStats.averageDailyUsage} min</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Peak Usage Day</span>
                    <span className="font-semibold">{analyticsStats.peakUsageDay}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Most Used Service</span>
                    <span className="font-semibold">{analyticsStats.mostUsedService}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Cost per Minute</span>
                    <span className="font-semibold">$0.10</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Audio File
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download History
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Calendar className="mr-2 h-4 w-4" />
                    View Calendar
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Manage Billing
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Services Tab */}
        <TabsContent value="services" className="space-y-6">
          {/* Service Breakdown Details */}
          <Card>
            <CardHeader>
              <CardTitle>Service Usage Breakdown</CardTitle>
              <CardDescription>Detailed breakdown of your service usage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {serviceBreakdown.length > 0 ? (
                  serviceBreakdown.map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: service.color }}
                        />
                        <span className="font-medium">{service.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{service.value}%</div>
                        <div className="text-sm text-muted-foreground">
                          {service.minutes} minutes
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No service usage data available
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Pricing Information */}
          <Card>
            <CardHeader>
              <CardTitle>Service Pricing</CardTitle>
              <CardDescription>Current pricing for all services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Transcription</h4>
                  <p className="text-2xl font-bold text-blue-600">$0.10</p>
                  <p className="text-sm text-muted-foreground">per minute</p>
                  <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                    <li>• Speaker diarization</li>
                    <li>• High accuracy</li>
                    <li>• Multiple languages</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Notes</h4>
                  <p className="text-2xl font-bold text-purple-600">$0.08</p>
                  <p className="text-sm text-muted-foreground">per minute</p>
                  <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                    <li>• Clean text output</li>
                    <li>• Faster processing</li>
                    <li>• Single speaker</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Summarization</h4>
                  <p className="text-2xl font-bold text-green-600">$0.05</p>
                  <p className="text-sm text-muted-foreground">per minute</p>
                  <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                    <li>• AI summaries</li>
                    <li>• Key points</li>
                    <li>• Action items</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 