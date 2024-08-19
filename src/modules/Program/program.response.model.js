export function allProgramsData(program) {
    return {
        _id: program._id,
        name: program.name,
        images: program.images[0].secure_url,
        ticketPriceAdult: program.ticketPriceAdult,
        ticketPriceChild: program.ticketPriceChild,
    }
}

export function programData(program) {
    return {
        _id: program._id,
        overview: program.overview,
        name: program.name,
        images: program.images.map(image => image.secure_url),
        ticketPriceAdult: program.ticketPriceAdult,
        ticketPriceChild: program.ticketPriceChild,
        rate: program.rate,
        schedule: program.schedule.map(item => ({
            time: item.time,
            activity: item.activity,
            _id: item._id, 
        }))
    }
}

export function reviewsProgram(program) {
    return {
        _id: program._id,
        name: program.name,
        images: program.images.map(image => image.secure_url),
        rate: program.rate,
        reviews: program.Reviews
    }
}

export function bookingProgram(book) {
    return {
        _id: book._id,
        program: {
            _id: book.programId._id,
            name: book.programId.name,
            images: book.programId.images[0].secure_url
        },
        activity: book.activityId.title,
        adultNo: book.adultNo,
        childNo: book.childNo,
        date: book.date.toISOString().split('T')[0],
        time: book.time,
        cancellationDeadline: book.cancellationDeadline,
        totalPrice: book.totalPrice,
        paymentstatus: book.paymentstatus,
    }
}

export function wishlistPorgrams(wishlist) {
    return {
        _id: wishlist._id,
        program: {
            _id: wishlist.programId._id,
            name: wishlist.programId.name,
            images: wishlist.programId.images[0].secure_url,
            ticketPriceAdult: wishlist.programId.ticketPriceAdult,
            ticketPriceChild: wishlist.programId.ticketPriceChild,
            rate: wishlist.programId.rate,
        },
    }
}