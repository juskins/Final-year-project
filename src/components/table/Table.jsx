import "./table.scss";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import moment from "moment";

const List = ({ data }) => {
  const closestExpiryProducts = data
    .filter(
      (product) => product.days_remaining < 30 && product.days_remaining > 0).sort((a, b) => a - b);
    // .sort((a, b) => {
    //   const aExpiry = moment(a.expiry_date, "M/D/YYYY");
    //   const bExpiry = moment(b.expiry_date, "M/D/YYYY");
    //   return aExpiry.diff(moment(), "days") - bExpiry.diff(moment(), "days");
    // })
    
    .slice(0, 10); // Take the top 10 closest to expiration
  return (
    <div className="tableWrapper">
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 350, overflow:"scroll" }} aria-label="simple table">
        <TableHead>
          <TableRow className="tr">
            <TableCell className="tableCell">S/N</TableCell>
            <TableCell className="tableCell">Product</TableCell>
            <TableCell className="tableCell">Batch No</TableCell>
            <TableCell className="tableCell">Quantity</TableCell>
            <TableCell className="tableCell">Expiry Date</TableCell>
            <TableCell className="tableCell">
              <b>Days to expiry</b>
            </TableCell>
            {/* <TableCell className="tableCell">Status</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {closestExpiryProducts.map((row, index) => {
            const daysToExpiry = moment(row.expiry_date, "M/D/YYYY").diff(
              moment(),
              "days"
            );
            return (
              <TableRow key={row.id} className="tr">
                <TableCell className="tableCell">{index + 1}</TableCell>
                <TableCell className="tableCell">
                  <div className="cellWrapper">{row.product_name}</div>
                </TableCell>
                <TableCell className="tableCell">
                  {row.batch_number}
                </TableCell>
                <TableCell className="tableCell">{row.quantity}</TableCell>
                <TableCell className="tableCell">
                  {row.expiry_date}
                </TableCell>
                <TableCell className="tableCell">
                  <b>{row.days_remaining < 1 ? "Expired":row.days_remaining}</b>
                </TableCell>

                {/* <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell> */}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};

export default List;
