import { RemoveRedEye } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  Rating,
  Stack,
  Table,
  TableContainer,
} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableHeader from "components/data-table/TableHeader";
import TablePagination from "components/data-table/TablePagination";
import { FlexBox } from "components/flex-box";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import Scrollbar from "components/Scrollbar";
import { H3, Paragraph, Small } from "components/Typography";
import useMuiTable from "hooks/useMuiTable";
import api from "utils/api/dashboard"; // =============================================================================

import {
  StyledIconButton,
  StyledTableCell,
  StyledTableRow,
} from "pages-sections/admin";
import React from "react";
const tableHeading = [
  {
    id: "name",
    label: "Name",
    align: "left",
  },
  {
    id: "customer",
    label: "Customer",
    align: "left",
  },
  {
    id: "comment",
    label: "Comment",
    align: "left",
  },
  {
    id: "rating",
    label: "Rating",
    align: "left",
  },
  {
    id: "action",
    label: "Action",
    align: "center",
  },
]; // =============================================================================

Reviews.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
}; // =============================================================================

export default function Reviews(props) {
  const {ProductReviews } = props;
  const { Reviews, items } = ProductReviews;

  const Review = Reviews?.map((review) => {
    const matchingItem = items.find((item) => item?.id === review?.itemid_id);

    return {
      ...review,
      image: matchingItem ? matchingItem.image : "",
    };
  });

  const imgurl=process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL

const Previews=ProductReviews?.Reviews

  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort,
  } = useMuiTable({
    Previews,
  });
  return (
    <Box py={4}>
      <H3 mb={2}>Product Reviews</H3>

      <Card>
        <Scrollbar>
          <TableContainer
            sx={{
              minWidth: 1000,
            }}
          >
            <Table>
              <TableHeader
                order={order}
                hideSelectBtn
                orderBy={orderBy}
                heading={tableHeading}
                rowCount={Previews?.length}
                numSelected={selected?.length}
                onRequestSort={handleRequestSort}
              />

              <TableBody>
                {Review?.map((review, index) => (
                  
                  <StyledTableRow tabIndex={-1} role="checkbox" key={index}>
                    <StyledTableCell align="left">
                      <FlexBox alignItems="center" gap={1.5}>
                        <Avatar
                          src={imgurl+review?.image || ''}
                          sx={{
                            borderRadius: "8px",
                          }}
                        />
                        <Paragraph>{review?.itemname || ''}</Paragraph>
                      </FlexBox>
                    </StyledTableCell>

                    <StyledTableCell align="left">
                      {review?.username || ''}
                    </StyledTableCell>

                    <StyledTableCell align="left">
                      <Small>{review?.review || ''}</Small>
                    </StyledTableCell>

                    <StyledTableCell align="left">
                      <Rating
                        value={review?.rating || ''}
                        size="small"
                        color="warning"
                        readOnly
                      />
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      <StyledIconButton>
                        <RemoveRedEye />
                      </StyledIconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          <TablePagination
            onChange={handleChangePage}
            count={Math.ceil(Previews?.length / rowsPerPage)}
          />
        </Stack>
      </Card>
    </Box>
  );
};// list data
export const getStaticProps = async () => {
  try {
    const ProductReviews = await api.getAllReviews();

    
    return {
      props: {
        ProductReviews: ProductReviews || [],
      },

    };
  } catch (error) {
    console.error('Failed to fetch product reviews:', error.message);




    return {
      props: {
        ProductReviews: [],
        error: true,
      },
    };
  }
};


