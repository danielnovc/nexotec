import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Lock, Key, Server, Smartphone, Globe, Database, FileText, CheckCircle, AlertTriangle } from "lucide-react"

export default function EncryptionPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Shield className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold">Encryption & Security</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Enterprise-grade encryption protecting your data at rest and in transit across all platforms
          </p>
        </div>

        {/* Security Overview */}
        <Card className="border-2 border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-200">
              <CheckCircle className="h-5 w-5" />
              Security Status: EXCELLENT
            </CardTitle>
            <CardDescription className="text-green-700 dark:text-green-300">
              Your application is fully secured with industry-leading encryption standards
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Encryption at Rest */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-blue-600" />
              Encryption at Rest
            </CardTitle>
            <CardDescription>
              All sensitive data is encrypted before storage using AES-GCM 256-bit encryption
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  Database Encryption
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    AES-GCM 256-bit encryption
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    PBKDF2 key derivation (100,000 iterations)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    Unique salt and IV for each encryption
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    Client-side encryption before storage
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  File Storage Encryption
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    Audio files encrypted before upload
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    Metadata encryption included
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    Secure key generation per user
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    Local storage encryption (mobile)
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Encryption in Transit */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-green-600" />
              Encryption in Transit
            </CardTitle>
            <CardDescription>
              TLS 1.3 encryption for all communications with secure cipher suites
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Server className="h-4 w-4" />
                  Backend Services
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">TLS 1.3</Badge>
                    <span className="text-sm">All API endpoints</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">RSA 4096-bit</Badge>
                    <span className="text-sm">Certificate keys</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">AES-GCM</Badge>
                    <span className="text-sm">Cipher suites</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">CHACHA20</Badge>
                    <span className="text-sm">Alternative ciphers</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  Frontend & Mobile
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    HTTPS-only communications
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    Secure WebSocket connections
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    Certificate pinning support
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    CORS security headers
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Certificate Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5 text-purple-600" />
              SSL/TLS Certificates
            </CardTitle>
            <CardDescription>
              Enterprise-grade certificates for all backend services
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Main Backend</h4>
                <div className="space-y-1 text-sm">
                  <div>✅ cert.pem</div>
                  <div>✅ key.pem</div>
                  <div>✅ chain.pem</div>
                </div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Notes Service</h4>
                <div className="space-y-1 text-sm">
                  <div>✅ cert.pem</div>
                  <div>✅ key.pem</div>
                  <div>✅ fullchain.pem</div>
                </div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Summary Service</h4>
                <div className="space-y-1 text-sm">
                  <div>✅ cert.pem</div>
                  <div>✅ key.pem</div>
                  <div>✅ chain.pem</div>
                  <div>✅ fullchain.pem</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Certificate Specifications</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Algorithm:</strong> RSA 4096-bit<br/>
                  <strong>Valid Period:</strong> 1 year<br/>
                  <strong>Subject:</strong> transcrib.local<br/>
                  <strong>Key Usage:</strong> Digital signature, Key encipherment
                </div>
                <div>
                  <strong>Extended Key Usage:</strong> Server & Client auth<br/>
                  <strong>SANs:</strong> localhost, *.transcrib.local<br/>
                  <strong>Signature:</strong> SHA-256<br/>
                  <strong>Compliance:</strong> TLS 1.3
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Headers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-orange-600" />
              Security Headers & Configuration
            </CardTitle>
            <CardDescription>
              Comprehensive security headers and configurations protecting your application
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold">HTTP Security Headers</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">HSTS</Badge>
                    <span>Strict-Transport-Security: max-age=31536000</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">CSP</Badge>
                    <span>Content-Security-Policy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">X-Frame-Options</Badge>
                    <span>DENY</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">X-Content-Type-Options</Badge>
                    <span>nosniff</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Referrer-Policy</Badge>
                    <span>strict-origin-when-cross-origin</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold">CORS Configuration</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    Allowed origins: nexogen.app, localhost
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    Credentials: true
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    Methods: GET, POST, PUT, DELETE, OPTIONS
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    Headers: Content-Type, Authorization, X-Request-ID
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Input Validation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              Input Validation & Security
            </CardTitle>
            <CardDescription>
              Comprehensive input validation and security measures
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Audio File Validation</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    Maximum file size: 100MB
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    Maximum duration: 1 hour
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    Allowed formats: WAV, MP3, M4A, FLAC, OGG, WEBM
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    Base64 validation
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold">Text Input Validation</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    Maximum length: 100KB
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    XSS protection
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    Script injection prevention
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    Rate limiting: 100 requests/hour
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Compliance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              Compliance & Standards
            </CardTitle>
            <CardDescription>
              Meeting industry security standards and compliance requirements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">TLS 1.3</h4>
                <p className="text-sm text-muted-foreground">Latest TLS standard with perfect forward secrecy</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">AES-GCM</h4>
                <p className="text-sm text-muted-foreground">Authenticated encryption with 256-bit keys</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">PBKDF2</h4>
                <p className="text-sm text-muted-foreground">100,000 iterations for key derivation</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Best Practices */}
        <Card>
          <CardHeader>
            <CardTitle>Security Best Practices</CardTitle>
            <CardDescription>
              How we maintain the highest security standards
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">For Users</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Use strong, unique passwords</li>
                    <li>• Enable two-factor authentication when available</li>
                    <li>• Keep your encryption keys secure</li>
                    <li>• Regularly update your applications</li>
                    <li>• Use HTTPS connections only</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">For Developers</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• All data encrypted before storage</li>
                    <li>• TLS 1.3 for all communications</li>
                    <li>• Input validation on all endpoints</li>
                    <li>• Rate limiting to prevent abuse</li>
                    <li>• Regular security audits</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 