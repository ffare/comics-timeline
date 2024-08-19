<?php
$json = file_get_contents('assets/data.json');
if ($json == false) {
  die('Error handling the JSON');
}

$json_data = json_decode($json, true);
if ($json_data == null) {
  die('Error decoding JSON');
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Main</title>
  <link rel="stylesheet" href="styles.css">
</head>

<body>
  <div id="bg-container">
    <div id="content-container">
      <?php foreach ($json_data[0]['issues'] as $issue): ?>
      <div class="box">
        <div class="writer">Stan Lee</div>
        <div class="title">Fantastic Four <?php echo $issue['issue_number']?></div>
        <img loading="lazy" src="<?php echo $issue['coverImage']?>" alt="CoverImage">
      </div>
      <?php endforeach; ?>
    </div>
  </div>
</body>

<script src="interface.js"></script>
<script src="init.js"></script>
</html>