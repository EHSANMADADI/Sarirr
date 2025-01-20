/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react'
import { download } from "./service";

export function OutputImageCard({ imageUrl }: { imageUrl: string }) {


    const handleDownload = () => {
        download(imageUrl, {
            internalDownload: true
        })
    }

    if (!imageUrl)
        return null;

    return (
        <div
            className="max-w-full m-3"
            style={{
                position: 'relative',
                width: "500px",
                height: "500px",
                border: "1px solid black",
                borderRadius: "20px",
                overflow: "hidden",
            }}
        >
            <img
                style={{ maxWidth: "100%", maxHeight: "100%" }}
                src={imageUrl}
            />

            <div style={{
                position: 'absolute',
                right: '15px',
                bottom: '15px'
            }}>
                <button
                    onClick={handleDownload}
                    style={{
                        borderRadius: '100%',
                        backgroundColor: 'whitesmoke',
                        padding: 7
                    }}
                >

                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                    </svg>
                </button>
            </div>
        </div>
    )
}