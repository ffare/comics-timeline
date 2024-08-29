<?php
$json = file_get_contents('data/data.json');
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
  <link rel="stylesheet" href="/assets/css/styles.css">
  <!-- TODO: MAKE THIS SERVER SIDE -->
  <script>
    var jsonData= <?php echo json_encode($json_data); ?>;
  </script>
</head>

<body>
 <div id="bg-container">  
    <div id="content-container">
      <div id="timescale-axis"></div>        
      <div class="series-container">
        <!-- <div class="label"></div> -->
        <div class="issues-container">          
          <?php foreach ($json_data[0]['issues'] as $issue): ?>
          <div class="box">
            <div class="label"><?php echo $issue['script']?></div>
            <img loading="lazy" src="<?php echo $issue['coverImage']?>" alt="CoverImage">
            <div class="issue-number"><?php echo $issue['issue_number']?></div>
          </div>          
          <?php endforeach; ?>
        </div>        
      </div>
        
    </div>
  </div>
</body>

<script src="/assets/js/interface.js"></script>
<script src="/assets/js/timescale.js"></script>
</html>