const filterData = (data, search, searchfeild) => {
    const { searchFeildOne, searchFeildTwo } = searchfeild;
    if (search === '') {
      return data
    } else if (searchFeildOne.toLowerCase().includes(search.toLowerCase()) || searchFeildTwo.toLowerCase().includes(search.toLowerCase())) {
      return data
    }
  }
  
  const filterEmpOrders = (data, search, searchfeild) => {
    const { searchFeildOne, searchFeildTwo, searchFeildThree } = searchfeild;
    if (search === '') {
      return data
    } else if (searchFeildOne.toLowerCase().includes(search.toLowerCase()) || searchFeildTwo.toLowerCase().includes(search.toLowerCase()) || searchFeildThree.toLowerCase().includes(search.toLowerCase())) {
      return data
    }
  }
  
  export { filterData, filterEmpOrders };