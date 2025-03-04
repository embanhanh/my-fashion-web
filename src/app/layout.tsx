import NavBar from '@/components/NavBar'
import './globals.css'
import Footer from '@/components/Footer'

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body>
                <NavBar />
                {children}
                <Footer />
            </body>
        </html>
    )
}
