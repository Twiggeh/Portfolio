import React from 'react';
import Button from '../components/MainContent/components/components/Button';

const Contact = () => {
	return (
		<div>
			<form action='./api/submit' method='post'>
				<label htmlFor='email'>Email</label>
				<input type='email' name='email' id='email' />
				<label htmlFor='subject'>Subject</label>
				<select name='subject' id='subject'>
					<option value='art'>I want you to paint something !</option>
					<option value='software'>Build my Idea !</option>
					<option value='art training'>
						I want to know how to create Illustrations !
					</option>
					<option value='software training'>
						I want help with the software that I am writing !
					</option>
					<option value='other'>Other ...</option>
				</select>
				<label htmlFor='message'>Message</label>
				<textarea name='message' id='message' cols='30' rows='10'></textarea>
				<Button as='button' type='submit'>
					Send
				</Button>
			</form>
		</div>
	);
};

export default Contact;
