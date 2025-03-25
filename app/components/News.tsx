import { Container, Typography } from "@mui/material";
export default function News() {
  return (
    <Container>
      <Typography variant="h4" className="text-center my-4">Новини</Typography>
      <Typography>Незабаром оновлення нашого каталогу ліків!</Typography>
    </Container>
  );
}