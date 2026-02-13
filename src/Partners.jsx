const partners = [
  { name: "EcoMarket", bonus: 200 },
  { name: "GreenShop", bonus: 150 },
];

export default function Partners() {
  return (
    <div>
      <h3>Партнёры</h3>
      {partners.map((p, i) => (
        <p key={i}>
          {p.name} — обмен от {p.bonus} бонусов
        </p>
      ))}
    </div>
  );
} 