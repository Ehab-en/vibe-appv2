import mongoose from "mongoose";

const NotificationSchema = mongoose.Schema({

    senderEmail: {
        type: String,
        required: true
    },

    receiverEmail: {
        type: String,
        required: true
    },

    type: {
        type: String,
        required: true
    },

    postId: {
        type: String
    },

    isRead: {
        type: Boolean,
        default: false
    }

},
    {
        timestamps: true
    });

const NotificationModel = mongoose.model(
    "notifications",
    NotificationSchema,
    "notifications"
);

export default NotificationModel;