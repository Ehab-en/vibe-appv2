import { useState, useEffect } from "react";

import { useDispatch } from "react-redux";

import {
    createPost,
    getPosts
} from "../features/PostSlice";

const CreatePost = ({ user }) => {

    const [postMsg, setPostMsg] =
        useState("");

    //  IMAGE
    const [postImage, setPostImage] =
        useState("");

    //  LOCATION
    const [address, setAddress] =
        useState("");

    const dispatch = useDispatch();

    //  ASK FOR LOCATION
    useEffect(() => {

        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(

                async (pos) => {

                    const lat =
                        pos.coords.latitude;

                    const lng =
                        pos.coords.longitude;

                    try {

                        const res = await fetch(
                            `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=87cd1a4424d84515ad3f67d9224dfedd`
                        );

                        const data =
                            await res.json();

                        const comp =
                            data.results[0]?.components;

                        const place =
                            comp?.suburb ||
                            comp?.neighbourhood ||
                            comp?.road ||
                            comp?.city ||
                            "";

                        const city =
                            comp?.city ||
                            comp?.town ||
                            comp?.state ||
                            "";

                        const country =
                            comp?.country || "";

                        let location = "";

                        if (place && city) {

                            location =
                                `${place}, ${city}`;

                        }

                        else if (city && country) {

                            location =
                                `${city}, ${country}`;

                        }

                        else {

                            location =
                                place ||
                                city ||
                                country ||
                                "Unknown location";

                        }

                        setAddress(location);

                    }

                    catch (err) {

                        console.log(
                            "Geocode error:",
                            err
                        );

                    }

                },

                () => {

                    console.log(
                        "Location denied"
                    );

                }

            );

        }

    }, []);

    //  CREATE POST
    const handlePost = async () => {

        if (!postMsg.trim()) return;

        if (!user || !user.email) {

            alert(
                "User not found. Please login again."
            );

            return;

        }

        await dispatch(createPost({

            email: user.email,

            username: user.username,

            profilepic: user.profilepic,

            postMsg,

            //  IMAGE
            postImage,

            //  LOCATION
            address:
                address || undefined,

            lat: 0,

            lng: 0

        }));

        setPostMsg("");

        setPostImage("");

        dispatch(getPosts());

    };

    return (

        <div
            style={{
                border: "1px solid #ccc",

                padding: "15px",

                borderRadius: "12px",

                marginBottom: "20px"
            }}
        >

            <p>
                What's on your mind?
            </p>

            {/* IMAGE INPUT */}
            <input
                value={postImage}

                onChange={(e) =>
                    setPostImage(
                        e.target.value
                    )
                }

                placeholder="Paste image URL..."

                className="form-control mb-2"
            />

            {/* MESSAGE */}
            <input
                value={postMsg}

                onChange={(e) =>
                    setPostMsg(
                        e.target.value
                    )
                }

                placeholder="Write something..."

                className="form-control mb-2"
            />

            {/* LOCATION */}
            {address && (

                <p
                    style={{
                        fontSize: "13px",
                        color: "#666"
                    }}
                >
                    📍 {address}
                </p>

            )}

            <button
                onClick={handlePost}
                className="btn btn-primary"
            >
                Post
            </button>

        </div>

    );

};

export default CreatePost;