import React from "react"
import PropTypes from "prop-types"
import Downshift from "downshift"
import {useLazyQuery} from "@apollo/react-hooks"
import {gql} from "apollo-boost"
import debounce from "lodash.debounce"
import {DropDown, DropDownItem, SearchStyles} from "../styles"

const SEARCH_ITEMS_QUERY = gql`
    query SEARCH_ITEMS_QUERY($text: String!) {
        items(
            where: {
                OR: [{title_contains: $text}, {description_contains: $text}]
            }
        ) {
            id
            title
            image
        }
    }
`

const Search = props => {
    const [search, {called, loading, data}] = useLazyQuery(SEARCH_ITEMS_QUERY)

    const onChange = debounce(async event => {
        await search({variables: {text: event.target.value}})
    }, 350)

    return (
        <SearchStyles>
            <div>
                <input
                    type="search"
                    onChange={event => {
                        event.persist()
                        onChange(event)
                    }}
                />
                <DropDown>
                    <p>Items go here.</p>
                    {called &&
                        !loading &&
                        data.items.map(item => {
                            return (
                                <DropDownItem key={item.id}>
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        width="50"
                                    />
                                    {item.title}
                                </DropDownItem>
                            )
                        })}
                </DropDown>
            </div>
        </SearchStyles>
    )
}

Search.propTypes = {}

export default Search
