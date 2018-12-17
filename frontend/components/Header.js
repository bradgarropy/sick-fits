import Navigation from "./Navigation"

const Header = props => {
    return (
        <div>
            <div className="bar">
                <a href="/">Sick Fits</a>
                <Navigation />
            </div>

            <div className="sub-bar">
                <p>Search</p>
            </div>

            <div>Cart</div>
        </div>
    )
}

Header.propTypes = {}

// export
export default Header
