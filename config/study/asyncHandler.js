// const asynchandler = (anyFunction) => {
//     async (req, res, next) => {
//         try {
//             await anyFunction(req, res, next)
//         } catch (error) {
//             res.status(error.code || 500).json({

//                 success: false,
//                 message: error.message
//             })
//         }
//     }
// }

const asynchandler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
            .catch((err) => next(err))
    }
}

export { asynchandler }