import styled, { keyframes } from 'styled-components'

export const Grid = styled.div`
	width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
    grid-gap: 25px;
    margin-top: 4rem;
	margin-bottom: 5rem;
	
	@media (min-width: 500px) {
        grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
	}
`

export const SearchBar = styled.input`
	padding-left: 1rem;
    padding-right: 1rem;
    height: 2.5rem;
    width: 200px;
    font-size: 1em;
    border: none;
    border-bottom: 1px solid #555;
	background-color: transparent;
	outline: none;
	margin: auto;
`

export const Tabs = styled.div`
	display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    cursor: pointer;
	margin-top: 1.6rem;
	
	& span {
		background-color: rgb(255, 255, 255);
		border: 1px solid rgb(202, 202, 202);
		padding: 0.4em 0.5em;
		color: black;
		text-decoration: none;
		font-size: 0.8em;
		min-width: 70px;
		text-align: center;
		border-radius: 0.5em;
		font-weight: 700;
		margin-top: 0.5em;
	}

	& span:not(:last-of-type) {
		margin-right: 1em;
	}

	& .active {
		background-color: #e7e7e7 !important;
	}
`

const loadspinner = keyframes`
 	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
`

export const Spinner = styled.div`
	display: flex;
	margin: auto;
	width: 3em;
	height: 3em;
	border: 0.5em solid #484d7627;
	border-left: 0.5em solid #484D76;
	border-radius: 50%;
	animation: ${loadspinner} 1.1s infinite linear;
	margin-bottom: 4rem;
`