<?php

	header("Content-type: text/html");

	$handle = curl_init($_POST["url"]);

// If there is something, read and return

  	curl_setopt($handle, CURLOPT_POST, true);
  	curl_setopt($handle, CURLOPT_POSTFIELDS, $formVars);
  	curl_setopt ($handle, CURLOPT_FOLLOWLOCATION, 1);
  	echo curl_exec($handle);
  	curl_close($handle);
?>