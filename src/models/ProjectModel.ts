import mongoose from "mongoose";

interface projectSchematypes {
    projectName: string;
    projectDescription: string;
    projectLiveLink: string;
    githubRepoLink: string;
    fundGoal: number; 
    username: string;
}

const projectSchema = new mongoose.Schema<projectSchematypes>({
    projectName: {
        type: String,
        required: true,
    },
    projectDescription: {
        type: String,
        required: true,
        maxlength: 150, 
    },
    projectLiveLink: {
        type: String,
    },
    githubRepoLink: {
        type: String,
        required: true,
    },
    fundGoal: {
        type: Number,
        required: true,
        max: 20000,
    },
    username: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

export default Project;
