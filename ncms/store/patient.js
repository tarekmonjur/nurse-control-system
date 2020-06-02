module.exports = {
    async getPatientsApi(){
        console.log('getPatients');
        const response = await fetch(`/api/patients`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.json();
    },

    async addPatientApi(formData) {
        console.log('addPatient');
        const response = await fetch(`/api/patients`, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGFyZWsiLCJtb2JpbGVfbm8iOiIiLCJlbWFpbCI6InRhcmVrQGdtYWlsLmNvbSIsImlkIjoiNWVjMzk0YjcxNDRmOTEyMzAwN2JlNzc2IiwiaWF0IjoxNTg5OTE4NDg5fQ.BNcNtGVA4kz5Ls6G3A598ovDdT95pkj4U-JlqSAgd8U'
            },
            json: true
        });
        return response.json();
    }
};