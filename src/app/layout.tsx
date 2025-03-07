import NavBar from '@/components/NavBar'
import './globals.css'
import Footer from '@/components/Footer'
import { Providers } from './providers'
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    <NavBar />
                    {children}
                    <Footer />
                </Providers>
            </body>
        </html>
    )
}
