// Your code here
function createEmployeeRecord(employee) {
    let employeeRecord = {
        firstName: '',
        familyName: '',
        title: '',
        payPerHour: 0,
        timeInEvents: [],
        timeOutEvents: []
    }
    
    employeeRecord.firstName = employee[0]
    employeeRecord.familyName = employee[1]
    employeeRecord.title = employee[2]
    employeeRecord.payPerHour = employee[3]
    
    return employeeRecord
}

function createEmployeeRecords(employees) {
    let employeeRecords = []
    
    employees.forEach(employee => {
        employeeRecords.push(createEmployeeRecord(employee))
    })
    
    return employeeRecords
}

function createTimeInEvent(employeeRecord, dateTime) {
    let timeInEvent = {
        type: 'TimeIn',
        hour: 0,
        date: ''
    }
    
    timeInEvent.hour = parseInt(dateTime.split(' ')[1], 10)
    timeInEvent.date = dateTime.split(' ')[0]
    employeeRecord.timeInEvents.push(timeInEvent)
    
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateTime) {
    let timeOutEvent = {
        type: 'TimeOut',
        hour: 0,
        date: ''
    }
    
    timeOutEvent.hour = parseInt(dateTime.split(' ')[1], 10)
    timeOutEvent.date = dateTime.split(' ')[0]
    employeeRecord.timeOutEvents.push(timeOutEvent)
    
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date) {
    let timeInEvent = {}
    let timeOutEvent = {}
    let hoursWorked = 0

    timeInEvent = employeeRecord.timeInEvents.find(timeInEvent => timeInEvent.date === date)
    timeOutEvent = employeeRecord.timeOutEvents.find(timeOutEvent => timeOutEvent.date === date)
    
    hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100
    
    return hoursWorked
}

function wagesEarnedOnDate(employeeRecord, date) {
    let hoursWorked = hoursWorkedOnDate(employeeRecord, date)
    let payPerHour = employeeRecord.payPerHour

    return hoursWorked * payPerHour
}

function allWagesFor(employeeRecord) {
    let allTimeInDates = []
    let allTimeOutDates = []
    let allDates = []
    
    employeeRecord.timeInEvents.forEach(timeInEvent => allTimeInDates.push(timeInEvent.date))
    employeeRecord.timeOutEvents.forEach(timeOutEvent => allTimeOutDates.push(timeOutEvent.date))

    allDates = [...allTimeInDates]
    
    const wage = allDates.reduce((accumulator, currentValue) => accumulator + wagesEarnedOnDate(employeeRecord, currentValue), 0)

    return wage
}

function calculatePayroll(employeeRecords) {
    let allWages = []
    employeeRecords.forEach(employee => allWages.push(allWagesFor(employee)))

    let payroll = 0
    payroll = allWages.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    console.log(allWages)
    return payroll
}