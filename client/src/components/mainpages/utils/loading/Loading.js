import React from 'react'
import './loading.css'

function Loading() {
    return (
        <div className="load-page mt-20">
            <div className="loader">
                <div>
                    <div>
                        <div>
                            <div>
                                <div>
                                    <div>
                                        <div>
                                            <div></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-3/4 m-auto mt-10 flex justify-center">
                <h1 className="text-2xl font-semibold text-red-400">Loading Products ... </h1>
            </div>
        </div>
    )
}

export default Loading
