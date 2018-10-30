render() {
 
    /* Code for checking wether even values are number/id, pretty weak as for now as it just checks one row ahead for a number value */

    const data = this.props.data.map(data => {
      for(var j=0; j<data.length; j++) {
     

      while (data[j] !== undefined) {
        
        if (j % 2 === 0) {
          
          if (typeof data[j] === "string") {
           
            data[j-1] = data[j];
            
          }
        }
       
      }
    }

    var columns = [];
    for(var i = 0; i<this.props.contentFields.length; i++) {
        columns.push(
          <td
            key={i*i}
            className="td-admin-get-all"
            onClick={() => this.showFirst(data[i*2], i)}
          >
            {data[i*2+1]}{" "}
          </td>
        );
    };
    for(var k = 0; k<this.props.contentFields.length; k++) {

      return(
     
      <tr key={data[50+k]} className="tr-admin-get-all">
      
          {columns}
      </tr>
    );
    }
  });

    const fields = this.props.contentFields.map(function(field) {
      return (
        <th key={field} className="th-admin-get-all">
          {field}{" "}
        </th>
      );
    });