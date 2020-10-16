import mongoose from 'mongoose';

const FormSubmissionSchema = mongoose.Schema({
	email: String,
	date: Date,
	subject: String,
	message: String,
});

const FormSubmission = mongoose.model('FormSubmission', FormSubmissionSchema);

export default FormSubmission;
