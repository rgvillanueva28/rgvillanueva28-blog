import React from 'react'

export default function postCardDiv({children}: any) {
    return (
        <div className="flex flex-row flex-wrap mx-auto w-11/12 md:w-10/12 lg:w-9/12">
            {children}
        </div>
    )
}
