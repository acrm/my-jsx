const root = document.getElementById('app-root');
jsxRenderer.render(<>
  Hello JSX world!
  <Component value={"test"} onValueChange={val => alert(val)} ></Component>
</>, root);
