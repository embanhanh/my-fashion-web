import NavBar from '@/components/NavBar'
import './globals.css'
import Footer from '@/components/Footer'
import { Providers } from './providers'
import { AuthProvider } from '@/context/userContext'
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body>
                <AuthProvider>
                    <Providers>
                        <NavBar />
                        {children}
                        <Footer />
                    </Providers>
                </AuthProvider>
            </body>
        </html>
    )
}
