import React from 'react'
import "./videoScreen.scss"
export default function VideoScreen({children,ref}) {

    return (
        <div className="video-screen">
{children}
        </div>
    )
}
