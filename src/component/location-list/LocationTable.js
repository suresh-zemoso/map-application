import React, { useState } from 'react'
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles({
    tableRow: {
        textDecoration: 'none',
        cursor: 'pointer'
    }
})
export default function LocationTable(props) {

    const { locationList, setlocationList } = props;
    const classes = useStyles(props);
    const [order, setOrder] = useState("desc");
    const history = useHistory();
    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }
    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }
    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    function createSortHandler(locationList, order) {
        setOrder(order === "asc" ? "desc" : "asc");
        const comparator = getComparator(order, "id");
        setlocationList(stableSort(locationList, comparator));

    }
    function moveTo(id) {
        history.push(`/locations/${id}`);
    }
    return (
        <div>
            <TableContainer>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <TableSortLabel
                                    active
                                    direction={order === "asc" ? "desc" : "asc"}
                                    onClick={() => createSortHandler(locationList, order)}
                                >
                                    Id
                             </TableSortLabel>
                            </TableCell>
                            <TableCell align="center">Location Attribute</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {locationList.map((location) => (
                            <TableRow key={location.id} hover className={classes.tableRow}
                                onClick={() => moveTo(location.id)} >
                                <TableCell scope="row">
                                    {location.id}
                                </TableCell>
                                <TableCell align="center">Longtitue {location.lng} and Latitue {location.lat}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div >
    )
}
