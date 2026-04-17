import React from 'react'

const Footer = ({completeTasksCount = 0 , activeTasksCount = 0}) => {
  return (
    <>
    {completeTasksCount + activeTasksCount > 0 &&  (
        <div className='text-center'>
            <p className='text-sm text-muted-foreground'>
            {completeTasksCount>0 &&(
                <p>
                   🎉 Tuyệt vời bạn đã hoàn thành {completeTasksCount} công việc!
                   {activeTasksCount > 0 &&`, còn ${activeTasksCount} công việc đang chờ bạn hoàn thành!`

                   }
                </p>
            )}
            {completeTasksCount === 0 && activeTasksCount > 0 && (
                <p>
                    Hãy bắt đầu làm {activeTasksCount} công việc đang chờ bạn hoàn thành nhé! 🚀
                </p>
            )}
            </p>
        </div>
    )}
    </>
  )
}

export default Footer