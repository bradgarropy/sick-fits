import Link from "next/link"

const Navigation = props => {
    return (
        <div>
            <Link href="/">
                <a>Home!</a>
            </Link>
            <Link href="/sell">
                <a>Sell!</a>
            </Link>
        </div>
    )
}

Navigation.propTypes = {}

// export
export default Navigation
