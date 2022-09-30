import React from "react";

const QueueSim = ({queue, current}) => {

    return (
        <div className="pr-5 absolute right-0 top-0 mt-32 pl-10 overflow-y-auto" style={{maxHeight: '60vh'}}>
            {queue.length > 0 && (
                <div>
                    <div className="pb-3">
                        <span className="text-gray-400 text-center">Stack</span><br/>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <div>
                            {queue.map((elm, i) => {
                                return (
                                    <>
                                        {elm.state !== 'POPPED' && (
                                            <div className="w-full font-bold text-center border-2 p-4 border-white text-white" key={i}>
                                                {elm.node}
                                                {elm.node===current && <span className="absolute text-2xl -ml-12 z-20 text-white">&rarr;</span>}
                                            </div>
                                        )}
                                    </>
                                )}
                            )}
                            {queue.filter(elm => elm.state === 'PUSHED').length === 0 && (
                                <div className="w-full text-transparent font-bold text-center border-2 p-4 border-white text-white">0</div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default QueueSim;
