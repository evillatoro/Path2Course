const app = Vue.createApp({

    data() {
        return {
            search: '',
            courses: []
        }
    },
    mounted() {
        fetch('/courses.json')
            .then(res => res.json())
            .then(data => {
                this.courses = Object.values(data.Courses)
            })
            .catch(err => console.log(err.message))
    },
    computed: {
        filteredCourses() {
            input = this.search.toUpperCase()

            if (this.courses != null) {
                return this.courses.filter((course) => {
                    return course.Name.match(input)
                })
            }
        }
    }

})

app.mount('#app')
