export const scheduleGenerator = (t_days, hoursPerDay, sessionLength) => {
    let schedule = [];

    for (let i = 0; i < t_days; i++) {
        if (sessionLength === '30min') {
            if (hoursPerDay === 4) {
                schedule.push({
                    day: i + 1,
                    sessions: [
                        { type: 'Recap/Revision', time: ['2:30PM - 2:50PM'] },
                        { type: 'Studying', time: ['3:00PM - 3:25PM', '3:30PM - 3:55PM', '4:00PM - 4:25PM'] },
                        { type: 'Studying', time: ['5:00PM - 5:25PM', '5:30PM - 5:55PM'] },
                        { type: 'Studying', time: ['6:30PM - 6:55PM', '7:00PM - 7:25PM', '7:30PM - 7:55PM'] },
                        { type: 'Recap/Revision', time: ['8:00PM - 8:20PM'] },
                    ],
                });
            } else if (hoursPerDay === 5) {
                schedule.push({
                    day: i + 1,
                    sessions: [
                        { type: 'Recap/Revision', time: ['2:30PM - 2:55PM'] },
                        { type: 'Studying', time: ['3:00PM - 3:25PM', '3:30PM - 3:55PM', '4:00PM - 4:25PM'] },
                        { type: 'Studying', time: ['5:00PM - 5:25PM', '5:30PM - 5:55PM', '6:00PM - 6:25PM', '6:30PM - 6:55PM'] },
                        { type: 'Studying', time: ['7:30PM - 7:55PM', '8:00PM - 8:25PM', '8:30PM - 8:55PM'] },
                        { type: 'Recap/Revision', time: ['9:00PM - 9:25PM'] },
                    ],
                });
            } else if (hoursPerDay === 6) {
                schedule.push({
                    day: i + 1,
                    sessions: [
                        { type: 'Recap/Revision', time: ['11:20AM - 11:50AM'] },
                        { type: 'Studying', time: ['12:00PM - 12:25PM', '12:30PM - 12:55PM', '1:00PM - 1:25PM', '1:30PM - 1:55PM'] },
                        { type: 'Studying', time: ['3:00PM - 3:25PM', '3:30PM - 3:55PM', '4:00PM - 4:25PM', '4:30PM - 4:55PM'] },
                        { type: 'Studying', time: ['6:00PM - 6:25PM', '6:30PM - 6:55PM', '7:00PM - 7:25PM', '7:30PM - 7:55PM'] },
                        { type: 'Recap/Revision', time: ['8:00PM - 8:30PM'] },
                    ],
                });
            } else if (hoursPerDay === 7) {
                schedule.push({
                    day: i + 1,
                    sessions: [
                        { type: 'Recap/Revision', time: ['10:00AM - 10:25AM'] },
                        { type: 'Studying', time: ['10:30AM - 10:55AM', '11:00AM - 11:25AM', '11:30AM - 11:55AM'] },
                        { type: 'Studying', time: ['12:30PM - 12:55PM', '1:00PM - 1:25PM', '1:30PM - 1:55PM'] },
                        { type: 'Recap/Revision', time: ['2:00PM - 2:10PM'] },
                        { type: 'Studying', time: ['3:00PM - 3:25PM', '3:30PM - 3:55PM', '4:00PM - 4:25PM', '4:30PM - 4:55PM'] },
                        { type: 'Recap/Revision', time: ['5:00PM - 5:10PM'] },
                        { type: 'Studying', time: ['6:00PM - 6:25PM', '6:30PM - 6:55PM', '7:00PM - 7:25PM'] },
                        { type: 'Studying', time: ['8:00PM - 8:25PM', '8:30PM - 8:55PM', '9:00PM - 9:25PM'] },
                        { type: 'Recap/Revision', time: ['9:30PM - 9:55PM'] },
                    ],
                });
            } else if (hoursPerDay === 8) {
                schedule.push({
                    day: i + 1,
                    sessions: [
                        { type: 'Recap/Revision', time: ['9:30AM - 9:50AM'] },
                        { type: 'Studying', time: ['10:00AM - 10:25AM', '10:30AM - 10:55AM', '11:00AM - 11:25AM'] },
                        { type: 'Studying', time: ['12:00PM - 12:25PM', '12:30PM - 12:55PM', '1:00PM - 1:25PM'] },
                        { type: 'Recap/Revision', time: ['1:30PM - 1:50PM'] },
                        { type: 'Studying', time: ['3:00PM - 3:25PM', '3:30PM - 3:55PM', '4:00PM - 4:25PM', '4:30PM - 4:55PM'] },
                        { type: 'Recap/Revision', time: ['5:00PM - 5:20PM'] },
                        { type: 'Studying', time: ['6:30PM - 6:55PM', '7:00PM - 7:25PM', '7:30PM - 7:55PM'] },
                        { type: 'Studying', time: ['8:30PM - 8:55PM', '9:00PM - 9:25PM', '9:30PM - 9:55PM'] },
                        { type: 'Recap/Revision', time: ['10:00PM - 10:20PM'] },
                    ],
                });
            } else if (hoursPerDay === 9) {
                schedule.push({
                    day: i + 1,
                    sessions: [
                        { type: 'Recap/Revision', time: ['9:30AM - 9:55AM'] },
                        { type: 'Studying', time: ['10:00AM - 10:25AM', '10:30AM - 10:55AM', '11:00AM - 11:25AM'] },
                        { type: 'Studying', time: ['12:00PM - 12:25PM', '12:30PM - 12:55PM', '1:00PM - 1:25PM'] },
                        { type: 'Recap/Revision', time: ['1:30PM - 1:50PM'] },
                        { type: 'Studying', time: ['3:00PM - 3:25PM', '3:30PM - 3:55PM', '4:00PM - 4:25PM'] },
                        { type: 'Studying', time: ['5:00PM - 5:25PM', '5:30PM - 5:55PM', '6:00PM - 6:25PM'] },
                        { type: 'Recap/Revision', time: ['6:30PM - 6:50PM'] },
                        { type: 'Studying', time: ['7:30PM - 7:55PM', '8:00PM - 8:25PM', '8:30PM - 8:55PM'] },
                        { type: 'Studying', time: ['9:30PM - 9:55PM', '10:00PM - 10:25PM', '10:30PM - 10:55PM'] },
                        { type: 'Recap/Revision', time: ['11:00PM - 11:20PM'] },
                    ],
                });
            } else if (hoursPerDay === 10) {
                schedule.push({
                    day: i + 1,
                    sessions: [
                        { type: 'Recap/Revision', time: ['7:00AM - 7:25AM'] },
                        { type: 'Studying', time: ['7:30AM - 7:55AM', '8:00AM - 8:25AM', '8:30AM - 8:55AM'] },
                        { type: 'Studying', time: ['9:30AM - 9:55AM', '10:00AM - 10:25AM', '10:30AM - 10:55AM'] },
                        { type: 'Recap/Revision', time: ['11:00PM - 11:25AM'] },
                        { type: 'Studying', time: ['12:00PM - 12:25PM', '12:30PM - 12:55PM', '1:00PM - 1:25PM', '1:30PM - 1:55PM'] },
                        { type: 'Studying', time: ['3:00PM - 3:25PM', '3:30PM - 3:55PM', '4:00PM - 4:25PM', '4:30PM - 4:55PM'] },
                        { type: 'Recap/Revision', time: ['5:00PM - 5:25PM'] },
                        { type: 'Studying', time: ['6:00PM - 6:25PM', '6:30PM - 6:55PM', '7:00PM - 7:25PM'] },
                        { type: 'Studying', time: ['8:00PM - 8:25PM', '8:30PM - 8:55PM', '9:00PM - 9:25PM'] },
                        { type: 'Recap/Revision', time: ['9:30PM - 9:55PM'] },
                    ],
                });
            }
        }
        if (sessionLength === '60min') {
            if (hoursPerDay === 4) {
                schedule.push({
                    day: i + 1,
                    sessions: [
                        { type: "Recap/Revision", time: "2:30PM - 3:30PM" },
                        { type: "Studying", time: "3:40PM - 4:40PM" },
                        { type: "Studying", time: "6:00PM - 7:00PM" },
                        { type: "Recap/Revision", time: "8:00PM - 9:00PM" }
                    ]
                });
            } else if (hoursPerDay === 5) {
                schedule.push({
                    day: i + 1,
                    sessions: [
                        { type: "Recap/Revision", time: "2:30PM - 3:30PM" },
                        { type: "Studying", time: "3:40PM - 4:40PM" },
                        { type: "Studying", time: "5:30PM - 6:30PM" },
                        { type: "Studying", time: "7:00PM - 8:00PM" },
                        { type: "Recap/Revision", time: "9:00PM - 10:00PM" }
                    ]
                });
            } else if (hoursPerDay === 6) {
                schedule.push({
                    day: i + 1,
                    sessions: [
                        { type: "Recap/Revision", time: "11:20AM - 12:20PM" },
                        { type: "Studying", time: "12:30PM - 1:30PM" },
                        { type: "Studying", time: "3:00PM - 4:00PM" },
                        { type: "Studying", time: "6:00PM - 7:00PM" },
                        { type: "Recap/Revision", time: "8:00PM - 9:00PM" }
                    ]
                });
            } else if (hoursPerDay === 7) {
                schedule.push({
                    day: i + 1,
                    sessions: [
                        { type: "Recap/Revision", time: "10:00AM - 11:00AM" },
                        { type: "Studying", time: "11:10AM - 12:10PM" },
                        { type: "Studying", time: "12:40PM - 1:40PM" },
                        { type: "Recap/Revision", time: "2:00PM - 3:00PM" },
                        { type: "Studying", time: "3:30PM - 4:30PM" },
                        { type: "Studying", time: "5:00PM - 6:00PM" },
                        { type: "Recap/Revision", time: "6:10PM - 7:10PM" },
                        { type: "Studying", time: "7:40PM - 8:40PM" },
                        { type: "Recap/Revision", time: "8:50PM - 9:50PM" }
                    ]
                });
            } else if (hoursPerDay === 8) {
                schedule.push({
                    day: i + 1,
                    sessions: [
                        { type: "Recap/Revision", time: "9:30AM - 10:30AM" },
                        { type: "Studying", time: "10:40AM - 11:40AM" },
                        { type: "Studying", time: "12:10PM - 1:10PM" },
                        { type: "Recap/Revision", time: "2:30PM - 3:30PM" },
                        { type: "Studying", time: "3:40PM - 4:40PM" },
                        { type: "Studying", time: "6:00PM - 7:00PM" },
                        { type: "Recap/Revision", time: "7:10PM - 8:10PM" },
                        { type: "Studying", time: "8:40PM - 9:40PM" },
                        { type: "Recap/Revision", time: "9:50PM - 10:50PM" }
                    ]
                });
            } else if (hoursPerDay === 9) {
                schedule.push({
                    day: i + 1,
                    sessions: [
                        { type: "Recap/Revision", time: "9:30AM - 10:30AM" },
                        { type: "Studying", time: "10:40AM - 11:40AM" },
                        { type: "Studying", time: "12:10PM - 1:10PM" },
                        { type: "Recap/Revision", time: "1:20PM - 2:20PM" },
                        { type: "Studying", time: "3:30PM - 4:30PM" },
                        { type: "Studying", time: "5:30PM - 6:30PM" },
                        { type: "Recap/Revision", time: "6:40PM - 7:40PM" },
                        { type: "Studying", time: "9:00PM - 10:00PM" },
                        { type: "Recap/Revision", time: "10:10PM - 11:10PM" }
                    ]
                });
            } else if (hoursPerDay === 10) {
                schedule.push({
                    day: i + 1,
                    sessions: [
                        { type: "Recap/Revision", time: "7:00AM - 8:00AM" },
                        { type: "Studying", time: "8:10AM - 9:10AM" },
                        { type: "Studying", time: "10:30AM - 11:30AM" },
                        { type: "Recap/Revision", time: "11:40AM - 12:40PM" },
                        { type: "Studying", time: "1:10PM - 2:10PM" },
                        { type: "Studying", time: "3:30PM - 4:30PM" },
                        { type: "Recap/Revision", time: "4:40PM - 5:40PM" },
                        { type: "Studying", time: "6:10PM - 7:10PM" },
                        { type: "Studying", time: "7:40PM - 8:40PM" },
                        { type: "Recap/Revision", time: "9:30PM - 10:30PM" }
                    ]
                });
            }
        }
        
    }
    return schedule;
}