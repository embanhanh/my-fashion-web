import Image from 'next/image'
import Link from 'next/link'

function Footer() {
    return (
        <div className="bg-gray-100 px-4 py-12 md:px-8 lg:px-16 2xl:px-32 mt-24">
            {/* Top */}
            <div className="flex flex-col md:flex-row gap-12 justify-between">
                {/* Info */}
                <div className="flex flex-col gap-4 w-full items-center md:items-start md:w-1/2 lg:max-w-72">
                    {/* Logo */}
                    <Image src="/Group.png" alt="logo" width={100} height={100} />
                    {/* Address */}
                    <p className="text-sm font-medium">72/15 Phan Bội Châu, Dĩ An, Bình Dương, Việt Nam</p>
                    {/* Phone */}
                    <p className="text-sm font-medium">+84 909 000 000</p>
                    {/* Email */}
                    <p className="text-sm font-medium">info@example.com</p>
                    {/* Socials */}
                    <div className="flex gap-4">
                        <Link href="/">
                            <Image src="/facebook.png" alt="facebook" width={24} height={24} />
                        </Link>
                        <Link href="/">
                            <Image src="/instagram.png" alt="instagram" width={24} height={24} />
                        </Link>
                        <Link href="/">
                            <Image src="/twitter.png" alt="twitter" width={24} height={24} />
                        </Link>
                    </div>
                </div>
                {/* Links */}
                <div className="hidden lg:flex gap-4 flex-1">
                    <div className="flex flex-col gap-4 w-1/3">
                        <h3 className="text-lg font-medium mb-8">COMPANY</h3>
                        <Link href="/" className="">
                            About Us
                        </Link>
                        <Link href="/" className="">
                            Careers
                        </Link>
                        <Link href="/" className="">
                            Blog
                        </Link>
                        <Link href="/" className="">
                            Contact Us
                        </Link>
                    </div>
                    <div className="flex flex-col gap-4 w-1/3">
                        <h3 className="text-lg font-medium mb-8">SHOP</h3>
                        <Link href="/" className="">
                            New Arrivals
                        </Link>
                        <Link href="/" className="">
                            Men
                        </Link>
                        <Link href="/" className="">
                            Women
                        </Link>
                        <Link href="/" className="">
                            Kids
                        </Link>
                    </div>
                    <div className="flex flex-col gap-4 w-1/3">
                        <h3 className="text-lg font-medium mb-8">HELP</h3>
                        <Link href="/" className="">
                            Customer Service
                        </Link>
                        <Link href="/" className="">
                            My Account
                        </Link>
                        <Link href="/" className="">
                            Returns
                        </Link>
                        <Link href="/" className="">
                            Privacy Policy
                        </Link>
                    </div>
                </div>
                {/* Payment */}
                <div className="flex flex-col gap-4 w-full items-center md:items-start md:w-1/2 lg:max-w-sm">
                    <h3 className="text-lg font-medium">SUBSCRIBE</h3>
                    <p className="text-sm">
                        Get the latest news and updates from our store and get 10% off your first purchase
                    </p>
                    <div className="flex gap-4">
                        <input
                            type="text"
                            placeholder="Your email"
                            className="border border-gray-300 rounded-md p-2 outline-none"
                        />
                        <button className="bg-black text-white px-4 py-2 rounded-md">Subscribe</button>
                    </div>
                    <p className="font-medium">Secure Payment</p>
                    <div className="flex gap-8">
                        <Image src="/visa.png" alt="visa" width={28} height={28} />
                        <Image src="/mastercard.png" alt="mastercard" width={28} height={28} />
                        <Image src="/paypal.png" alt="paypal" width={28} height={28} />
                    </div>
                </div>
            </div>
            {/* Bottom */}
            <div className="flex justify-center md:justify-between items-center mt-8">
                <p className="text-sm">© 2025 All rights reserved</p>
                <p className="text-sm text-gray-500 hidden md:block">Language | Currency </p>
            </div>
        </div>
    )
}

export default Footer
