import mongoose from 'mongoose';

export const validFormSubmissionSubjects = [
	'software',
	'art',
	'art training',
	'software training',
	'other',
];

const FormSubmissionSchema = new mongoose.Schema({
	email: String,
	date: String,
	subject: {
		type: String,
		enum: validFormSubmissionSubjects,
	},
	message: String,
});

export interface IFormSubmission {
	email: string;
	date: string;
	subject: string;
	message: string;
}

interface FormSubmissionDocument extends IFormSubmission, mongoose.Document {}

interface FormSubmissionModel extends mongoose.Model<FormSubmissionDocument> {}

const FormSubmission = mongoose.model<FormSubmissionDocument, FormSubmissionModel>(
	'FormSubmission',
	FormSubmissionSchema
);

export default FormSubmission;
