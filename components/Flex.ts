import styled, { css } from 'styled-components'

interface FlexProps {
	h?:
		| 'flex-start'
		| 'flex-end'
		| 'center'
		| 'space-between'
		| 'space-around'
		| 'space-evenly'
	v?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline'
	dir?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
	w?: string
	auto?: boolean
	flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
	stretch?: boolean
}

const Flex = styled.div<FlexProps>`
	display: flex;
	justify-content: ${(props) => props.h || 'flex-start'};
	align-items: ${(props) => props.v || 'stretch'};
	flex-direction: ${(props) => props.dir || 'row'};
	width: ${(props) => props.w || 'auto'};
	margin: ${(props) => (props.auto ? 'auto' : 0)};
	flex-wrap: ${(props) => props.flexWrap || 'nowrap'};
	${(props) =>
		props.stretch &&
		css`
			> * {
				flex: 1;
			}
		`}
`

export default Flex
