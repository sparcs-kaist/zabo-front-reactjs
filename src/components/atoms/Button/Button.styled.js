import styled from "styled-components"

import { backgroundColor, textColor } from "../../../theme"

const ButtonWrapper = styled.div``

// apply theming to a styled component
export const Wrapper = styled.button`
	background-color: ${backgroundColor};
	color: ${textColor};
`

export default ButtonWrapper
