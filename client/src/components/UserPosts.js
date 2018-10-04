import React from 'react';
import axios from 'axios';

// Components
import UserPost from './UserPost';

// Styles
import styled from 'styled-components';

const UserPostsDiv = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	.no-posts {
		border: 1px solid black;
		border-radius: 5px;
		background-color: #ddd;
		width: 80%;
		height: 100px;
		margin: 20px;
		padding: 10px;
		box-shadow: 0 8px 16px 0 rgba(0,0,0,1);
		transition: 0.3s;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		animation-name: grow-anim;
		animation-duration: 1s;
		animation-fill-mode: forwards;

		&:hover {
			box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
		}

		p {
			font-size: 1.2rem;
			text-align: center;
		}
	}
`;

export default class UserPosts extends React.Component {
	state = {
		posts: [],
	};

	componentDidMount() {
		const URL = 'http://localhost:5000';
		axios.get(`${ URL }/api/users/${ this.props.id }/posts`)
			.then(posts => this.setState({
				posts: posts.data,
			}))
			.catch(err => console.log(err));
	};

	render() {
		const { posts } = this.state;
		return(
			<UserPostsDiv>
				{
					posts.length ?
					posts.map((post, i) => <UserPost key = { i } post = { post } />)
					:
					<div className = 'no-posts'>
						<p>This user has no posts.</p>
					</div>
				}
			</UserPostsDiv>
		);
	}
};
