import Header from "./Header"
import Meta from "./Meta"

class Page extends React.Component {
    static propTypes = {}

    state = {}

    render = () => {
        return (
            <div>
                <Meta />
                <Header />
                {this.props.children}
            </div>
        )
    }
}

// export
export default Page
