myApp.factory('pagination', function () {
    return {

        maxPagination: 10,
        generatePageList: (currentPage, currentListPage, lastPage, cb) => {
            let newListPage = []
            if (currentPage <= 5 || ((currentPage > lastPage - 4) && currentListPage.includes(lastPage)))
                cb(currentListPage)
            else if (currentPage + 5 > lastPage) {
                for (let i = lastPage - 10; i <= lastPage; i++) {
                    newListPage.push(i)
                }
                cb(newListPage)
            }
            else {
                for (let i = currentPage - 5; i < currentPage + 5; i++) {
                    newListPage.push(i)
                }
                cb(newListPage)
            }
        },

        generateFirstPagination: (totalOfPages, cb) => {
            let firstPagination = []
            if (totalOfPages >= this.maxPagination) {
                for (let i = 0; i <= maxPagination; i++) {
                    firstPagination.push(i)
                }
            }
            else {
                for (let i = 1; i <= totalOfPages; i++) {
                    firstPagination.push(i)
                }
            }
            cb(firstPagination)
        }
    }
})
