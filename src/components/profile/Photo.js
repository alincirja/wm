import React, { useState, useRef, useContext, useEffect } from "react";
import { storage } from "../../base";
import { AuthContext } from "../../context/Auth";

const Photo = props => {
    const { currentUser } = useContext(AuthContext);
    const fileInput = useRef(null);
    const image = useRef(null);
    const [fileToUpload, setFileToUpload] = useState(null);
    const [fileUploadProgress, setFileUploadProgress] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (fileToUpload) {
            setLoading(true);
            const path = `images/profile/${currentUser.uid}`;
            const uploadTask = storage.ref(path + "/" + fileToUpload.name).put(fileToUpload);
            uploadTask.on("state_changed", (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setFileUploadProgress(progress);
            }, error => {
                console.log(error);
            }, () => {
                storage.ref(path).child(fileToUpload.name).getDownloadURL().then(url => {
                    currentUser.updateProfile({
                        photoURL: url
                    }).then(() => {
                        image.current.src = url
                    }).catch(err => {
                        console.log(err);
                    });
                }).then(() => {
                    setLoading(false);
                });
            });
        }
        return () => {
            setFileToUpload(null);
        }
    }, [fileToUpload, currentUser])

    return (
        <div className="photo" onClick={() => fileInput.current.click()}>
            {currentUser.photoURL ? (
                <img ref={image} src={currentUser.photoURL} alt={currentUser.displayName}/>
            ): (
                "Upload photo"
            )}
            <input ref={fileInput} type="file" className="file-input" onChange={e => setFileToUpload(e.target.files[0])} />
            {loading ? (
                <div className="upload-progress">
                    <div className="progress"><span>{fileUploadProgress}</span></div>
                </div>
            ) : null}
        </div>
    );
}

export default Photo;